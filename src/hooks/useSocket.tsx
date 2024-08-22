import { useEffect, useRef } from "react";
import config from "../contants/config";
import { Manager, Socket } from "socket.io-client";

const manager = new Manager(`${config.WS_HOST}`, {
  reconnectionDelayMax: 10000,
  query: {},
  transports: ["websocket"],
});

type Props = {
  namespace: string;
  handleMessage: (message: any) => void;
};

const useSocket = (props: Props) => {
  const socketNamespace = useRef<Socket>();

  useEffect(() => {
    socketNamespace.current = manager.socket(props.namespace);

    socketNamespace.current.io.on("open", () => {
      console.log("opened", props.namespace);
    });

    socketNamespace.current.on("msgToClient", props.handleMessage);

    socketNamespace.current.io.on("error", (e) => {
      console.log("error", e);
    });

    // return () => {
    //   socketNamespace.current?.io?._close();
    // };
  }, [props.namespace]);

  return {};
};

export default useSocket;
