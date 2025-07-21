import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import validator from "validator";

const addressSchema = new mongoose.Schema({
  street1: {
    type: String,
    required: true,
  },
  street2: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name not provided"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "user must have a password"],
    select: true,
  },
 passwordConfirm: {
  type: String,
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Validator function to determine if password confirmation is required.
 * Returns true if the document is new, indicating password confirmation
 * is needed for new user records.
 */

/*******  872bcfb7-e863-43dc-a1af-63786409ba22  *******/
  required: function () {
    return this.isNew;
  },
  validate: {
    validator: function (el) {
      return el === this.password;
    },
    message: "Passwords do not match!",
  },
  select: false,
},
  phone: {
    type: String,
    required: true,
  },
  address: [addressSchema],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  image: {
    type: String,
    default:
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Hash password and set passwordConfirm before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = this.password;
  next();
});

// Create password reset token and set expiry
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
  return resetToken;
};

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Check if provided password matches user's password
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if user changed password after the token was issued
userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

export default User;