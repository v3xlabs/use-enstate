export type NameOrAddress =
    | {
          name: string;
      }
    | {
          address: string;
      }
    | {
          nameOrAddress: string;
      };