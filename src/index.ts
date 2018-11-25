import {GoalPie} from "./components/GoalPie";
import {timer} from "rxjs/index";

const goalPai = new GoalPie('#valuePie', 'Women');

function getRandomInt(max=100) {
    return Math.floor(Math.random() * Math.floor(max));
}

const tmr = timer(1000, 1500);
tmr.subscribe(() => {
    goalPai.value = getRandomInt();
    goalPai.goal = getRandomInt();
});
