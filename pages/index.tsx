import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

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

  const renderNotConnectedContainer = () => (
    <button
      className={`${styles['cta-button']} ${styles['connect-wallet-button']}`}
      onClick={connectHandler}
    >
      Connect to Wallet
    </button>
  );

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <div className="header-container">
          <p className={styles.header}>🍭 Candy Drop</p>
          <p className={styles['sub-text']}>NFT drop machine with fair mint</p>
          {!connected && renderNotConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

export default Home
