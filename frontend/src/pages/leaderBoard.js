import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Nav from "@components/Navbar/nav";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

const columns = [
    { id: "Rank", label: "Rank", minWidth: 100 },
    { id: "username", label: "Name", minWidth: 170 },
    {
        id: "points",
        label: "Points",
        minWidth: 170,
        align: "right",
    },
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([]);
    const [myRank, setMyRank] = React.useState(5);

    const fetchData = async () => {
        console.log("entered");
        try {
            const config = {
                withCredentials: true,
            };

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/participant/leaderboard`,
                config
            );
            console.log(response);

            const result = response.data.data;

            setMyRank(response.data.myRank);
            // console.log(myRank);
            // console.log(result);

            if (Array.isArray(result)) {
                const sortedData = result.sort((a, b) => b.points - a.points);
                const dataWithRanks = sortedData.map((item, index) => ({
                    Rank: index + 1,
                    username: item.username,
                    points: item.points,
                }));

                setData(dataWithRanks);
            } else {
                toast.error("Data format is incorrect");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error fetching data");
        }
    };

    React.useEffect(() => {
        async function fetchDataAndSetData() {
            await fetchData();
        }
        fetchDataAndSetData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Head>
        <title>Leaderboard - NJATH</title>
      </Head>
            <Nav></Nav>
            <ToastContainer autoClose={2000} />
            <div classusername="app-background" />
            <div className="flex-center flex-col w-full  ">
                <div className=" font-montserrat max-md:text-sm gap-4 max-sm:p-5 flex-between justify-center text-lg font-bold w-4/5 tracking-wide my-4  mt-10">
                    <p>Leaderboard</p>
                    <p className="align-right">
                        Your Rank: <span className="text-njathgold">{myRank}</span>
                    </p>
                </div>
                <Paper
                    sx={{
                        width: "80%",
                        overflow: "hidden",
                        backgroundColor: "transparent",
                        margin: "auto",
                        // marginTop: 20,
                        border: "2px solid grey",
                        fontFamily: "Montserrat, sans-serif",
                    }}
                >
                    <TableContainer sx={{ maxHeight: 500, fontFamily: "Montserrat, sans-serif" }}>
                        <Table stickyHeader aria-label="sticky table" sx={{ borderRadius: 10 }}>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                                color: "#111A23",
                                                backgroundColor: "#FDCC06",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.username}
                                        >
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={{
                                                        color: "white",
                                                        fontWeight: "500",
                                                        letterSpacing: "1px",
                                                    }}
                                                >
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            color: "#111A23",
                            backgroundColor: "#D3D3D3",
                            fontWeight: 700,
                            letterSpacing: "1px",
                        }}
                    />
                </Paper>
            </div>
        </div>
    );
}
