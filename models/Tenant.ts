import mongoose, { Schema, model, models } from 'mongoose';

// Har mahine ke bill ka structure
const BillSchema = new Schema({
  month: { type: String, required: true },

  rentStartDate: {
    type: Date,
  },

  rentDueDate: {
    type: Date,
  },

  electricityUnits: { type: Number, default: 0 },
  electricityAmount: { type: Number, default: 0 },
  rentAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Unpaid' },
  createdAt: { type: Date, default: Date.now },
  
  paymentDate: {
    type: Date,
  },

  paymentMethod: {
    type: String,
    default: "",
  },
}
);

const TenantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, required: true, unique: true },
  roomNumber: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  advancePayment: {
  type: Number,
  default: 0,
},
rentStartDate: {
  type: Date,
  required: true,
},

vacateDate: {
  type: Date,
  default: null,
},

aadhaarCard: {
  type: String,
  default: '',
},
initialMeterReading: {
  type: Number,
  default: 0,
},

meterPhoto: {
  type: String,
  default: '',
},
lastReminderSent: {
  type: Date,
  default: null,
},

  joiningDate: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
  bills: [BillSchema] // Yahan har mahine ka bill save hoga
});

const Tenant = models.Tenant || model('Tenant', TenantSchema);

export default Tenant;