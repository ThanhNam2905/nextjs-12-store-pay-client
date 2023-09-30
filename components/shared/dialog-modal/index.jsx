import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import styles from "./styles.module.scss";
import { hideDialog } from "../../../store/dialogSlice";
import { PiWarningCircle } from "react-icons/pi";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
export default function DialogModal({ type }) {
    const dispatch = useDispatch();
    const { dialog } = useSelector((state) => ({ ...state }));
    // const test = dialog.msgs.find((x) => x.type == "error");

    const handleClose = () => {
        dispatch(hideDialog());
    };

    return (
        <div
            style={{
                position: "fixed",
                zIndex: "999999999999999",
            }}
        >
            <Dialog
                open={dialog.show}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                disableScrollLock={true}
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
            >
                <DialogTitle
                    className={`${styles.header}`}
                >
                    {dialog.header}
                </DialogTitle>
                <DialogContent className={styles.body}>
                    {dialog.msgs &&
                        dialog.msgs.map((msg, i) => (
                            <DialogContentText
                                className={styles.msg}
                                id="alert-dialog-slide-description"
                                key={i}
                            >
                                <span className={styles.msg__icon}>
                                    { msg.type == "error" ? (
                                            <span className={styles.msg__icon__warning}>
                                                <PiWarningCircle/>
                                            </span>
                                        )
                                        : (
                                            <span className={styles.msg__icon__success}>
                                                <AiOutlineCheckCircle/>
                                            </span>
                                        )
                                    }
                                </span>
                                <span>{msg.msg}</span>
                            </DialogContentText>
                        ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Đóng</Button>
                    {dialog.link?.link && (
                        <Button>
                            <Link href={dialog.link.link}>
                                <span>{dialog.link.text}</span>
                            </Link>
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
