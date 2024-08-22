import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveResult } from "../redux/slices";

const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { words } = useSelector((state: { root: StateType }) => state.root);

  const nextHandler = () => {
    setResult((prev) => [...prev, ans]);
    setCount((prev) => prev + 1);
    setAns("");
  };
  useEffect(() => {
    if (count + 1 > words.length) navigate("/result");
    dispatch(saveResult(result));
  }, [result]); 

  return (
    <>
      <Container maxWidth="sm" sx={{ padding: "1rem" }}>
        <Typography m={"2rem 0"}>Quiz</Typography>
        <Typography variant="h3">
          {count + 1} - {words[count]?.word}
        </Typography>

        <FormControl>
          <FormLabel sx={{ mt: "2rem", mb: "1rem" }}>Meaning</FormLabel>

          <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)}>
            {words[count]?.options.map((i, index) => (
              <FormControlLabel
                value={i}
                control={<Radio />}
                label={i}
                key={index}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          fullWidth
          onClick={nextHandler}
          disabled={ans === ""}
        >
          {count === words.length - 1 ? "Submit" : "Next"}
        </Button>
      </Container>
    </>
  );
};

export default Quiz;
