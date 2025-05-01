import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Container, Title } from "./styles";
import { GroupCard } from "../../components/GroupCard";
import { useState } from "react";
import { FlatList } from "react-native";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([
    "Galera do Futebol",
    "Amigos GFD",
    "Familia Braga",
    "Turma de React Native",
  ]);

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => console.log("clicando")} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma ?" />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />

      <Button
        title="Criar Nova Turma"
        onPress={() => console.log("Clicando no Botão")}
      />
    </Container>
  );
}
