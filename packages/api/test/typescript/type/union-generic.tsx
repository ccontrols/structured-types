type PropsWithChildren<P> = P & { children?: string };

type Props =
  | {
      id: string;
      bool: boolean;
    }
  | { bool: boolean };

export type FullProps = PropsWithChildren<Props>;
