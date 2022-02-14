import { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import app from "./core/config";
import {
  getDatabase,
  ref,
  remove,
  push,
  onValue,
  update,
} from "firebase/database";
import Icon from "react-native-vector-icons/MaterialIcons";

const db = getDatabase(app);
const COLORS = { primary: "#1f145c", white: "#fff", grey: "#ebebeb" };

export default () => {
  const [todos, setTodos] = useState();
  const [listTodo, setListTodo] = useState({});

  useEffect(() => {
    const data = ref(db, "todoList");
    onValue(data, (snapshot) => {
      setListTodo(snapshot.val());
    });
    return () => {
      console.log("a");
    };
  }, []);

  const addTodo = () => {
    if (!todos) {
      alert("input cannot be empty");
      return false;
    }

    push(ref(db, "/todoList"), {
      task: todos,
      completed: false,
    }).then(() => {
      setTodos("");
    });
  };

  const handleClearAll = () => {
    remove(ref(db, "todoList/"));
  };

  const clearAllTodos = () => {
    Alert.alert("Confirm", "Clear todos?", [
      {
        text: "Yes",
        onPress: () => handleClearAll(),
      },
      {
        text: "No",
      },
    ]);
  };

  const handleDone = (key, val) => {
    update(ref(db, "todoList/" + key), {
      ...val,
      completed: true,
    });
  };

  const handleDelete = (key) => {
    remove(ref(db, "todoList/" + key));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            color: COLORS.primary,
            textDecorationLine: item[1].completed ? "line-through" : "none",
          }}
        >
          {item[1].task}
        </Text>
        <View style={styles.tombol}>
          <TouchableOpacity onPress={() => handleDone(item[0], item[1])}>
            <View style={[styles.actionIcon, { backgroundColor: "green" }]}>
              <Icon name="done" size={25} color="white" />
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => handleDelete(item[0])}>
              <View style={styles.actionIcon}>
                <Icon name="delete" size={25} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: COLORS.primary,
          }}
        >
          SAN TODO APP
        </Text>
        <Icon name="delete" size={30} color="red" onPress={clearAllTodos} />
      </View>

      {listTodo && (
        <FlatList
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={Object.entries(listTodo)}
          renderItem={renderItem}
          keyExtractor={(item) => item[0]}
        />
      )}

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputan}
            onChangeText={(text) => setTodos(text)}
            value={todos}
            placeholder="Add Todo"
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    height: 50,
    backgroundColor: COLORS.grey,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  inputan: {
    padding: 13,
    borderRadius: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    padding: 20,
    backgroundColor: COLORS.grey,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  tombol: {
    flexDirection: "row",
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.grey,
    marginTop: 50,
  },
});
