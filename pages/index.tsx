import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

type Event = "connect" | "disconnect";

interface Phantom {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  on: (event: Event, callback: () => void) => void;
}

const Home: NextPage = () => {
  const [phantom, setPhantom] = useState<Phantom | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const { solana } = window as any;

    if (solana && solana.isPhantom) {
      setPhantom(solana as Phantom);
    }
  }, []);

  useEffect(() => {
    phantom?.on("connect", () => {
      setConnected(true);
    });

    phantom?.on("disconnect", () => {
      setConnected(false);
    });
  }, [phantom])

  const connectHandler = () => {
    phantom?.connect();
  };

  const disconnectHandler = () => {
    phantom?.disconnect();
  }

  return (
    <>
      {!connected && (
        <button
          onClick={connectHandler}
          className="bg-purple-500 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white whitespace-nowrap hover:bg-opacity-75"
        >
          Connect to Phantom
        </button>
      )}

      {connected && (
        <button
          onClick={disconnectHandler}
          className="py-2 px-4 border border-purple-700 rounded-md text-sm font-medium text-purple-700 whitespace-nowrap hover:bg-purple-200"
        >
          Disconnect from Phantom
        </button>
      )}
    </>
  );
}

export default Home
