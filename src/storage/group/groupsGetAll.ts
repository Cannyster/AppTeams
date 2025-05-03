import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";

export async function groupsGetAll() {
  try {
    //Lembrando que tudo que e armazenado no storage, e feito em string,
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

    //Então pegamos o resultado e fazemos o parse para groups, se estiver vazia retorna um array vazio
    const groups: string[] = storage ? JSON.parse(storage) : [];

    return groups;
  } catch (error) {
    throw error;
  }
}
