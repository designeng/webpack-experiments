export default function controller() {
    return {
        log: (event) => {
            console.log("TARGET TEXT:::", event.target);
        },

        onFirstNameChange: (event) => {
            console.log("FIRST NAME:::", event.target.value);
        },

        onSecondNameChange: (event) => {
            console.log("SECOND NAME:::", event.target.value);
        }
    }
}