import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { User } from "../types";

export default function UserCard({
  user,
  callback,
}: {
  user: User;
  callback: (user: User) => void;
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 150, objectFit:"inherit" }}
        image={user.picture.large}
        title={`${user.name.first} ${user.name.last}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${user.name.title}. ${user.name.first} ${user.name.last}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => callback(user)} color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
