import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import UsersTable from "../features/users/components/user-table/UsersTable";
import AddIcon from "@mui/icons-material/Add";
import UserForm from "../features/users/components/user-form/UserForm";
import { deleteUser, getUserList } from "../services/users.service";
import { IUser } from "../features/users/types/user.table.type";

const UserPage = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
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
    setOpen(false);
    await loadUsers();
    setSelectedUser(null);
  };

  const handleUpdateUser = (user: IUser) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId); // Call the delete service
        await loadUsers(); // Refresh the user list
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
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
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add new
          </Button>
        </div>
      </div>
      <div>
        <UsersTable
          users={users}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      </div>
      {open && (
        <UserForm
          onOk={handleOk}
          onClose={() => setOpen(false)}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default UserPage;
