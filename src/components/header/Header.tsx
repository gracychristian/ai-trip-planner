import { Box } from "@mui/material";

export const Header = () => {
    return <>
        <Box>
            <div className="w-full flex justify-between h-[70px] bg-[#b47ec7] px-5 py-2 items-center">
                <h3 className="font-bold text-lime-100">Travly</h3>
                {/* <button className="text-white bg-[#46b4f3] w-[60px] h-[40px] rounded-full">pro</button> */}
            </div>
        </Box>
    </>;
}