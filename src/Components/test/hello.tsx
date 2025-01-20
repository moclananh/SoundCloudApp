const HelloFunction = () => {
  const name = "thanhne";
  const age = 20;
  const info = {
    role: "admin",
    status: "active",
  };

  return (
    <div>
      <h4 style={{ color: "red" }}>
        hello {name} with age {age}
      </h4>
      <h4>
        role {info.role} with status {info.status}
      </h4> 
    </div>
  );
};
export default HelloFunction;
