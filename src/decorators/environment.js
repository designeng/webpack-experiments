import underscore from "underscore";
const COMPILATION_MODE = process.env.COMPILATION_MODE;

console.log("COMPILATION_MODE::::", COMPILATION_MODE);

export default function environment(...extraElements) {
    return (target, name, description) => {
        return {
            value: description.value
        }
    }
}