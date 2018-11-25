import {GoalPie} from "./components/GoalPie";

export function goalPie(selector: string,
                        title: string,
                        colorTitle = '#A6CAD8',
                        colorValueTitle = '#FFFFFF',
                        colorGoal = '#FFFFFF',
                        colorCircle = '#007A93',
                        colorValue = '#AAC891') {
    return new GoalPie(selector,
        title,
        colorTitle,
        colorValueTitle,
        colorGoal,
        colorCircle,
        colorValue)
};