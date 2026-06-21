import { connectToMongoDB } from "../src/shared/database/mongodb"
import { hashPassword } from "../src/modules/auth/password"
import { UserModel } from "../src/modules/auth/user.model"

async function seedAdmin() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("seed-admin can only run outside production.")
  }

  await connectToMongoDB()

  const email = "admin@sweetfactory.local"
  const existingAdmin = await UserModel.findOne({ email })

  if (existingAdmin) {
    console.log(`Admin user already exists: ${email}`)
    return
  }

  await UserModel.create({
    name: "Admin",
    email,
    passwordHash: await hashPassword("admin123"),
    role: "admin",
    isActive: true,
  })

  console.log(`Admin user created: ${email}`)
}

seedAdmin()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
