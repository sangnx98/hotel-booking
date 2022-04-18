import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const indexOfLastUser = currentPage * postPerPage;
  const indexOfFirstUser = indexOfLastUser - postPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const pageNumbers = Math.ceil(users.length / postPerPage);

  useEffect(() => {
    getAllUser()
      .then((res) => res.json())
      .then(setUsers);
  }, []);

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
          {currentUsers.map((user: any, index: any) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{user.id}</StyledTableCell>
              <StyledTableCell align="center">{user.name}</StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.address}</StyledTableCell>
              <StyledTableCell align="center">
                {user.phoneNumber}
              </StyledTableCell>
              <StyledTableCell align="center">{user.password}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Stack spacing={2} >
      <Pagination count={pageNumbers} sx={{display: 'flex', justifyContent: 'center', padding: '0.3rem', borderTop: '1px solid #ebedeb'}} color="primary" onChange={(e :any, page :number)=> setCurrentPage(page)}/>
      </Stack>
    </TableContainer>
  );
}
