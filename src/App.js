import logo from './logo.svg';
import './App.css';
import Todo from './Todo';
import React, { useState, useEffect } from "react";
import { 
  Container, 
  List, 
  Paper,
  Grid2,
  Button,
  AppBar,
  Toolbar,
  Typography 
} from "@mui/material";
import AddTodo from './AddTodo';
import { call, signout } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    call("/todo", "GET", null)
    .then((response) => {
      setItems(response.data);
      setLoading(false);
    })
  }, []);

  const addItem = (item) => {
    call("/todo", "POST", item)
    .then((response) => setItems(response.data));
  };

  const editItem = (item) => {
    call("/todo", "PUT", item)
    .then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item)
    .then((response) => setItems(response.data));
  };

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo item={item} 
              key={item.id}
              editItem={editItem}
              deleteItem={deleteItem} />
        ))}
      </List>      
    </Paper>
  );

  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid2 justifyContent="space-between" container>
          <Grid2 item>
            <Typography variant="h6">
              오늘의 할 일
            </Typography>
          </Grid2>
          <Grid2 item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  );

  /* 로딩 중이 아닐 때 렌더링할 부분 */
  let todoListPage = (
    <div>
      {navigationBar} {/* 네비게이션 바 렌더링 */}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  /* 로딩 중일 때 렌더링할 부분 */
  let loadingPage = <h1> 로딩 중...</h1>;
  let content = loadingPage;

  if (!loading) {
    content = todoListPage;
  }

  return <div className="App">{content}</div>;
}

export default App;
