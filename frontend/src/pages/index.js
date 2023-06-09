import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { TimeframeSelector } from "src/sections/overview/timeframe-selector";
import { Total } from "src/sections/overview/total";
import { Donut } from "src/sections/overview/donut";
import { Spends } from "src/sections/overview/spends";
import { AddExpense } from "src/sections/overview/addexpense";

const Page = () => (
  <>
    <Head>
      <title>Expenses</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} md={12} lg={12}>
            <TimeframeSelector />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Total />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Donut />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Spends />
          </Grid>
        </Grid>
        <AddExpense/>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;