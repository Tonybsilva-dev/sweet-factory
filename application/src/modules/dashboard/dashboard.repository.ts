import { Types } from "mongoose"

import { PurchaseModel } from "@/src/modules/purchases/purchase.model"
import { SaleModel } from "@/src/modules/sales/sale.model"

import type {
  DashboardDateRange,
  DashboardExpensesMetrics,
  DashboardSalesMetrics,
  DashboardTopProduct,
} from "./dashboard.types"

type SalesAggregationResult = {
  salesCents: number
  estimatedCostCents: number
  estimatedGrossProfitCents: number
  salesCount: number
}

type ExpensesAggregationResult = {
  ingredientsCents: number
  packagingCents: number
}

type TopProductAggregationResult = {
  _id: {
    productId: Types.ObjectId | string
    nameSnapshot: string
  }
  quantity: number
  revenueCents: number
  estimatedProfitCents: number
}

export async function aggregateSalesMetrics(
  range: DashboardDateRange,
): Promise<DashboardSalesMetrics> {
  const [result] = await SaleModel.aggregate<SalesAggregationResult>([
    {
      $match: {
        saleDate: {
          $gte: range.startDate,
          $lt: range.endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        salesCents: { $sum: "$netTotalCents" },
        estimatedCostCents: { $sum: "$estimatedCostCents" },
        estimatedGrossProfitCents: { $sum: "$estimatedGrossProfitCents" },
        salesCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        salesCents: 1,
        estimatedCostCents: 1,
        estimatedGrossProfitCents: 1,
        salesCount: 1,
      },
    },
  ])

  return {
    salesCents: result?.salesCents ?? 0,
    estimatedCostCents: result?.estimatedCostCents ?? 0,
    estimatedGrossProfitCents: result?.estimatedGrossProfitCents ?? 0,
    salesCount: result?.salesCount ?? 0,
  }
}

export async function aggregateExpensesMetrics(
  range: DashboardDateRange,
): Promise<DashboardExpensesMetrics> {
  const [result] = await PurchaseModel.aggregate<ExpensesAggregationResult>([
    {
      $match: {
        purchaseDate: {
          $gte: range.startDate,
          $lt: range.endDate,
        },
      },
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: null,
        ingredientsCents: {
          $sum: {
            $cond: [
              { $eq: ["$items.itemType", "ingredient"] },
              "$items.totalPriceCents",
              0,
            ],
          },
        },
        packagingCents: {
          $sum: {
            $cond: [
              {
                $in: [
                  "$items.itemType",
                  ["packaging_material", "packaging"],
                ],
              },
              "$items.totalPriceCents",
              0,
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        ingredientsCents: 1,
        packagingCents: 1,
      },
    },
  ])

  return {
    ingredientsCents: result?.ingredientsCents ?? 0,
    packagingCents: result?.packagingCents ?? 0,
  }
}

export async function aggregateTopProducts(
  range: DashboardDateRange,
): Promise<DashboardTopProduct[]> {
  const results = await SaleModel.aggregate<TopProductAggregationResult>([
    {
      $match: {
        saleDate: {
          $gte: range.startDate,
          $lt: range.endDate,
        },
      },
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: {
          productId: "$items.productId",
          nameSnapshot: "$items.nameSnapshot",
        },
        quantity: { $sum: "$items.quantity" },
        revenueCents: { $sum: "$items.totalPriceCents" },
        estimatedProfitCents: { $sum: "$items.estimatedProfitCents" },
      },
    },
    { $sort: { quantity: -1, revenueCents: -1 } },
    { $limit: 10 },
  ])

  return results.map((result) => ({
    productId: result._id.productId.toString(),
    nameSnapshot: result._id.nameSnapshot,
    quantity: result.quantity,
    revenueCents: result.revenueCents,
    estimatedProfitCents: result.estimatedProfitCents,
  }))
}

