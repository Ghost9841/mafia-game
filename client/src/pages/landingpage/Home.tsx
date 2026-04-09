import { Button } from "@/components/ui/button";

export const Home = () => {
    return (
        <div>
            <h1>Welcome to the Mafia Game!</h1>
            <p>Join a game room and play with your friends.</p>
            <input type="text" placeholder="Room Code" />
            <Button>Join Game</Button>
        </div>
    )
}
export default Home;