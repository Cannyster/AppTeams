import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Container, Content, Icon } from "./styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate("players", { group });
    // navigation.navigate("players", { group: group });
    // Forma explicita, a primeira e a implicita ja que o estado eo parâmetros tem o mesmo nome 'group'
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
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
