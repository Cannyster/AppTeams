import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Container } from "./styles";
import { GroupCard } from "../../components/GroupCard";
import { useState, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "../../storage/group/groupsGetAll";
import { Loading } from "../../components/Loading";

export function Groups() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Turmas", "Não foi possível carregar as turmas");
    } finally {
      setIsLoading(false);
    }
  }

  //Estratégia para atualizar a lista de equipe a cada vez que o usuário voltar para essa tela
  //o useCallBack e usado para armazenar a referencia dos dados daquela função, isso evita
  //renderizações desnecessárias do componente
  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma ?" />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
        />
      )}

      <Button title="Criar Nova Turma" onPress={handleNewGroup} />
    </Container>
  );
}
