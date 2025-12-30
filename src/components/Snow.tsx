import Snowfall from "react-snowfall";
import type { CSSProperties } from "react";

const snowStyle: CSSProperties = {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
    pointerEvents: "none",
};

const Snow = () => {
    return (
        <Snowfall
            snowflakeCount={120}
            style={snowStyle}
            color="#ffffff"
        />
    );
};

export default Snow;
