import { Modal, Input, Select, message } from "antd";
import { useState } from "react";
import { z } from "zod";
import { CreateUserRequest, Role, Gender } from "../../types/user.table.type";
import { createUser } from "../../../../services/users.service";
import styles from "./UserForm.module.css";
interface UserFormProps {
  onOk: (user: CreateUserRequest) => void;
  onClose: () => void;
}

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  age: z.number(),
  gender: z.nativeEnum(Gender).refine((v) => v !== null && v !== undefined, {
    message: "Gender is required",
  }),
  address: z.string().min(1, "Address is required"),
  role: z.nativeEnum(Role).refine((v) => v !== null && v !== undefined, {
    message: "Role is required",
  }),
});

const UserForm = ({ onOk, onClose }: UserFormProps) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: "",
    email: "",
    password: "",
    age: 0,
    gender: Gender.MALE,
    address: "",
    role: Role.USER,
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange =
    (field: keyof CreateUserRequest) => (value: string | number | null) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  // Form validation using zod
  const validateForm = () => {
    const result = userSchema.safeParse(formData);
    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => issue.message);
      message.error(errorMessages.join(", "));
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleOk = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await createUser(formData);
      message.success("User added successfully!");
      onOk(response);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        age: 0,
        gender: Gender.MALE,
        address: "",
        role: Role.USER,
      });
    } catch (error) {
      // Display the error message from the API
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add new user"
      open={true}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
      maskClosable={false}
    >
      <div className={styles["modal-content"]}>
        <div className={styles["form-item"]}>
          <label>Name:</label>
          <Input
            value={formData.name || ""}
            onChange={(e) => handleChange("name")(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className={styles["form-item"]}>
          <label>Email:</label>
          <Input
            value={formData.email || ""}
            onChange={(e) => handleChange("email")(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className={styles["form-item"]}>
          <label>Password:</label>
          <Input.Password
            value={formData.password || ""}
            onChange={(e) => handleChange("password")(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className={styles["form-item"]}>
          <label>Age:</label>
          <Input
            value={formData.age !== null ? formData.age.toString() : ""}
            onChange={(e) =>
              handleChange("age")(
                e.target.value ? parseInt(e.target.value, 10) : null
              )
            }
            type="number"
            placeholder="Enter age"
          />
        </div>
        <div className={styles["form-item"]}>
          <label>Gender:</label>
          <Select
            value={formData.gender}
            onChange={(value) => handleChange("gender")(value)}
            placeholder="Select gender"
          >
            <Select.Option value={Gender.MALE}>Male</Select.Option>
            <Select.Option value={Gender.FEMALE}>Female</Select.Option>
          </Select>
        </div>
        <div className={styles["form-item"]}>
          <label>Address:</label>
          <Input
            value={formData.address || ""}
            onChange={(e) => handleChange("address")(e.target.value)}
            placeholder="Enter address"
          />
        </div>
        <div className={styles["form-item"]}>
          <label>Role:</label>
          <Select
            value={formData.role}
            onChange={(value) => handleChange("role")(value)}
            placeholder="Select role"
          >
            <Select.Option value={Role.USER}>User</Select.Option>
            <Select.Option value={Role.ADMIN}>Admin</Select.Option>
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export default UserForm;
