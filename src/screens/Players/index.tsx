import { Header } from "../../components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Highlight } from "../../components/Highlight";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Input } from "../../components/Input";
import { Filter } from "../../components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";
import { AppError } from "../../utils/AppError";
import { PlayerAddByGroup } from "../../storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "../../storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "../../storage/player/PlayerStorageDTO";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { playerRemoveByGroup } from "../../storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "../../storage/group/groupRemoveByName";
import { Loading } from "../../components/Loading";

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPLayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const newPlayerNameInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const newPLayer = {
    name: newPLayerName,
    team,
  };

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas filtradas do time selecionado"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddPlayer() {
    if (newPLayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar"
      );
    }

    try {
      await PlayerAddByGroup(newPLayer, group);
      newPlayerNameInputRef.current?.blur(); // blur retira o foco do componente
      // Keyboard.dismiss() // opção ao blur para fechar o teclado
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova Pessoa", "Não foi possível adicionar");
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa.");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      Alert.alert("Remover grupo", "Não foi possível remover a turma");
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover", "Deseja remover a turma?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => groupRemove() },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da Pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPLayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon={"add"} type="PRIMARY" onPress={handleAddPlayer} />
      </Form>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HeaderList>
            <FlatList
              data={["Time A", "Time B"]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Filter
                  title={item.toString()}
                  isActive={item === team}
                  onPress={() => setTeam(item)}
                />
              )}
              horizontal
            />
            <NumberOfPlayers>{players.length}</NumberOfPlayers>
          </HeaderList>

          <FlatList
            data={players}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PlayerCard
                name={item.name}
                key={item.name}
                onRemove={() => handleRemovePlayer(item.name)}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty message="Não há pessoas nesse time" />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 },
            ]}
          />
        </>
      )}

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
