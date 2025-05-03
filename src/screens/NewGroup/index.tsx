import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Container, Content, Icon } from "./styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "../../storage/group/groupCreate";
import { AppError } from "../../utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();
  const disable = group.trim().length === 0;

  async function handleNew() {
    try {
      if (group.length === 0) {
        return Alert.alert("Novo Grupo", "Informa o nome da turma.");
      }

      await groupCreate(group);
      navigation.navigate("players", { group });
      // navigation.navigate("players", { group: group });
      // Forma explicita, a primeira e a implicita ja que o estado eo parâmetros tem o mesmo nome 'group'
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("NovoGrupo", error.message);
      } else {
        Alert.alert("NovoGrupo", "Não foi possivel criar um novo grupo");
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title={"Nova Turma"}
          subtitle={"crie a turma para adicionar as pessoas"}
        />
        <Input
          placeholder="Nome da turma"
          onChangeText={(text) => setGroup(text)}
          // onChangeText={setGroup} // Forma implicita, acima esa a forma explicita
        />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
          disabled={disable}
        />
      </Content>
    </Container>
  );
}
