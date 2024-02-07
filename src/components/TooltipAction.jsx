import Tooltip from "@mui/material/Tooltip";

const TooltipAction = ({ placement, label, children }) => {
  return (
    <Tooltip title={label} placement={placement}>
      {children}
    </Tooltip>
  );
};

export default TooltipAction;
