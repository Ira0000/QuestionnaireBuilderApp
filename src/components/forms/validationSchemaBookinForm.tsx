import * as yup from "yup";

const bookingValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address",
    ),
  // .email("Please enter a valid email address"),

  bookingDate: yup
    .date()
    .nullable()
    .required("Booking date is required")
    .min(new Date(), "Booking date cannot be in the past")
    .typeError("Please select a valid date"),

  comment: yup.string().max(500, "Comment must not exceed 500 characters"),
});

export type BookingFormData = yup.InferType<typeof bookingValidationSchema>;

export default bookingValidationSchema;
