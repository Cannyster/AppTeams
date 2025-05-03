import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "../../utils/AppError";

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupsGetAll();

    const groupAlreadyExists = storedGroups.includes(newGroupName);

    if (groupAlreadyExists) {
      throw new AppError("já existe um grupo cadastrado com esse nome.");
    }

    //Para conseguir salvar e preciso, converter os objetos para texto
    const storage = JSON.stringify([
      ...storedGroups, //o rest pega todos os valores existentes naquela variável
      newGroupName, // e salvamos o novo valor
    ]);

    //o setItem tem 2 parametros, o primeiro eo grupo eo segundo o valor
    //asyncstorage trabalha com itens de chave/valor
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
