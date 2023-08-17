import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { User } from "./types";

const apiUrl = "https://randomuser.me/api/?results=50";

function App() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    const usersData = localStorage.getItem("indexed_db");
    if (!usersData) {
      fetchData();
    } else {
      setLoading(false);
      setUsers(JSON.parse(usersData));
    }
  }, []);

  const deleteHandler = (user: User) => {
    const result = users.filter(
      (eachUser) => eachUser.id.value !== user.id.value
    );
    localStorage.setItem("indexed_db", JSON.stringify(result));
    setUsers(result ?? []);
    setOpen(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl).then((res) => res.json());
      if (res && res.results) {
        setUsers(res.results);
        setLoading(false);
        localStorage.setItem("indexed_db", JSON.stringify(res.results));
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Container>
      {loading ? (
        <>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh" }}
          >
            <Grid item xs={3}>
              <CircularProgress />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <AppBar position="fixed" color="secondary">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Total Users: {users.length}
              </Typography>
              <Button color="inherit" onClick={fetchData}>
                Refresh
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container style={{ marginTop: "70px" }} spacing={2}>
            {users &&
              users.length > 0 &&
              users.map((user: User, i) => (
                <Grid key={i} item xs={6} md={4}>
                  <UserCard user={user} callback={deleteHandler} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="User deleted"
      />
    </Container>
  );
}

export default App;
