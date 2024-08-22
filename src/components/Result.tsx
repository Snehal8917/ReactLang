import {
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../redux/slices";
import { useNavigate } from "react-router-dom";
import pass from "../images/pass.gif";
import fail from "../images/fail.gif";
import { countMatchingElements } from "../utils/features";

const Result = () => {
  const { words, result } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const correctAns = countMatchingElements(
    result,
    words.map((i) => i.meaning)
  );
  const percentage = (correctAns / words.length) * 100;

  const resetHandler = (): void => {
    dispatch(clearState());
    navigate("/");
  };
  return (
    <>
      <Container maxWidth={"sm"}>
        <Typography variant="h3" color={"primary"} m={"2rem 0"}>
          Result
        </Typography>
        <Typography variant="h6" m={"1rem"}>
          You got {correctAns} right of {words?.length}
        </Typography>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Stack>
            <Typography m={"1rem 0"} variant="h5">
              Your Ans
            </Typography>

            <List>
              {result.map((i, index) => (
                <ListItem key={index}>
                  {index + 1}-{i}
                </ListItem>
              ))}
            </List>
          </Stack>
          <Stack>
            <Typography variant="h5" m={"1rem 0"}>
              Correct Ans
            </Typography>
            <List>
              {words?.map((i, index) => (
                <ListItem key={index}>
                  {index + 1}-{i.meaning}
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>

        <Typography
          variant="h5"
          m={"1rem"}
          color={percentage > 50 ? "green" : "red"}
        >
          {percentage > 50 ? (
            <>
              Pass 😊
              <br />
              <img
                style={{ width: "200px", height: "200px" }}
                src={`${pass}`}
                srcSet={`${pass}`}
                alt={"OMG_PASS"}
                loading="lazy"
              />
            </>
          ) : (
            <>
              Fail 😢
              <br />
              <img
                style={{ width: "200px", height: "200px" }}
                src={`${fail}`}
                srcSet={`${fail}`}
                alt={"fail"}
                loading="lazy"
              />
            </>
          )}
        </Typography>
        <Button onClick={resetHandler} sx={{ m: "1rem" }} variant="contained">
          Reset
        </Button>
      </Container>
    </>
  );
};

export default Result;
