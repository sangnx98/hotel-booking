import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          borderTop: "1px solid #c2c0bc",
          color: "#c2c0bc",
          textAlign: "center",
          padding: "1rem 5rem 1rem 5rem",
          mt: "2rem",
          display: { sm: "none", md: "block", xl: "block" },
        }}
      >
        <Typography variant="subtitle2" >
          © 2022 Luxstay. Bản quyền thuộc về Công ty TNHH Luxstay Việt Nam -
          MSDN: 0108308449. Mọi hành vi sao chép đều là phạm pháp nếu không có
          sự cho phép bằng văn bản của chúng tôi.
        </Typography>
        <Typography variant="subtitle2" >
          Tầng 21 tòa nhà Capital Tower số 109 phố Trần Hưng Đạo, phường Cửa
          Nam, quận Hoàn Kiếm, Hà Nội. Email: info@luxstay.com, Số điện thoại:
          18006586.
        </Typography>
        <Typography variant="subtitle2" >
          Số Giấy chứng nhận đăng ký doanh nghiệp: 0108308449, ngày cấp:
          06/06/2018, nơi cấp: Sở Kế hoạch và Đầu tư TP Hà Nội
        </Typography>
      </Box>
    </Container>
  );
}
