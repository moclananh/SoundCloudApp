import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import UsersTable from "../features/users/components/user-table/UsersTable";
import AddIcon from "@mui/icons-material/Add";
import UserForm from "../features/users/components/user-form/UserForm";
import { getUserList } from "../services/users.service";

const UserPage = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch user list on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUserList();
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleOk = async () => {
    console.log("User added successfully!");
    setOpen(false);
    await loadUsers();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>User Management</h2>
        <div>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add new
          </Button>
        </div>
      </div>
      <div>
        <UsersTable users={users} />
      </div>
      {open && <UserForm onOk={handleOk} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default UserPage;
