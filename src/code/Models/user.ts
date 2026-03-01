import { define, DataTypes } from 'module/k_sqlite'

export const userModel = define(
  'admin',
  {
    user_id: {
      type: DataTypes.String,
      required: true
    },
    name: {
      type: DataTypes.String,
      required: true
    },
    is_admin: {
      type: DataTypes.Boolean,
      required: true
    },
    email: {
      type: DataTypes.String,
      required: true
    },
  },
  {
    timestamps: true,
  }
)
