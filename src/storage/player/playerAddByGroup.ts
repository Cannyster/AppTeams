import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "../storageConfig";
import { AppError } from "../../utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGetByGroup } from "./PlayersGetByGroup";

export async function PlayerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayer = await playersGetByGroup(group);

    const playerAlreadyExists = storedPlayer.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists.length > 0) {
      throw new AppError("Essa pessoa já esta adicionada em um time aqui.");
    }

    const storage = JSON.stringify([...storedPlayer, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
