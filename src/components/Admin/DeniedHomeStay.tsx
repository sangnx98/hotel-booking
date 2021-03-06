import { useState, useEffect } from "react";
import { Table, TableContainer } from "@mui/material";
import { Box } from "@mui/system";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../store/userSlice";

import { Room } from "../../types";
import { CONFIG } from "../../config/config";
import { RoomApprovement, RoomsStatus } from "../../enum";

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

export default function DeniedHomeStay() {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = () => {
    fetch(`${CONFIG.ApiRooms}?isChecked=${RoomApprovement.Dinied}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setRooms);
  };

  const setApprove = async (room: Room, index: number) => {
    const { id } = room;
    const data = { ...room, isChecked: RoomApprovement.Approved };

    fetch(`${CONFIG.ApiRooms}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        const newRooms = [...rooms];
        newRooms[index] = result;
        setRooms(newRooms);
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: `???? ph?? duy???t th??nh c??ng`,
          })
        );
      });
  };

  const setDennie = async (room: Room, index: number) => {
    const { id } = room;
    const data = { ...room, isChecked: RoomApprovement.Dinied };

    fetch(`${CONFIG.ApiRooms}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        const newRooms = [...rooms];
        newRooms[index] = result;
        setRooms(newRooms);
      })
      .then(() =>
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: `????  t??? ch???i x??t duy???t ch??? ???`,
          })
        )
      )
      .catch((err) => {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: `C?? g?? ???? kh??ng ???n :( ${err})`,
          })
        );
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">???nh</StyledTableCell>
              <StyledTableCell align="center">T??n ch??? ???</StyledTableCell>
              <StyledTableCell align="center">?????a ch???</StyledTableCell>
              <StyledTableCell align="center">Duy???t</StyledTableCell>
              <StyledTableCell align="center">Tr???ng th??i</StyledTableCell>
              <StyledTableCell align="center">H??nh ?????ng</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room: any, index: any) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{room.id}</StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "center" }}
                >
                  <img src={room.bgUrl} alt="" width="250px" height="250px" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {room.homeStayName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {room.street}, {room.province}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    color: `${
                      room.isChecked === RoomApprovement.Processing
                        ? "orange"
                        : room.isChecked === RoomApprovement.Approved
                        ? "green"
                        : "red"
                    }`,
                  }}
                >
                  {room.isChecked === RoomApprovement.Processing
                    ? "??ang ch???"
                    : room.isChecked === RoomApprovement.Approved
                    ? "???? duy???t"
                    : "T??? ch???i"}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    color: `${
                      room.status === RoomsStatus.Renting
                        ? "green"
                        : room.status === RoomsStatus.Processing
                        ? "blue"
                        : "red"
                    }`,
                  }}
                >
                  {room.status === RoomsStatus.Renting
                    ? "??ang thu??"
                    : room.status === RoomsStatus.Processing
                    ? "Ch??? duy???t"
                    : "C??n tr???ng"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ color: "green", cursor: "pointer" }}
                      onClick={() => setApprove(room, index)}
                    />
                    <CancelIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => setDennie(room, index)}
                    />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
