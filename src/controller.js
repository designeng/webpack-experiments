export default function controller() {
    return {
        log: (event) => {
            console.log("TARGET TEXT:::", event.target);
        }
    }
}