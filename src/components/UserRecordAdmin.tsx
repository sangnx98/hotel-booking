import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getAllUser } from "../services/userService";
import { User } from "../types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserRecordAdmin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUser()
      .then((res) => res.json())
      .then(setUsers);
  }, []);
  console.log('users', users)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Tên người dùng</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Địa chỉ</StyledTableCell>
            <StyledTableCell align="center">Số điện thoại</StyledTableCell>
            <StyledTableCell align="center">Mật khẩu</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any, index: any) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{user.id}</StyledTableCell>
              <StyledTableCell align="center">{user.name}</StyledTableCell>
              <StyledTableCell align="center">
                {user.email}
              </StyledTableCell>
              <StyledTableCell align="center">
                {user.address}
              </StyledTableCell>
              <StyledTableCell align="center">
                {user.phoneNumber}
              </StyledTableCell>
              <StyledTableCell align="center">
                {user.password}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
