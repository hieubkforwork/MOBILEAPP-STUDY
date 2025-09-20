import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "../../component/SignOutButton";
import { Image } from "expo-image";
import { useTransaction } from "../hook/useTransaction";
import { useEffect } from "react";
import PageLoader from "@/component/PageLoader";
import { styles } from "@/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from "@/component/BalanceCard";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { trans, summary, isLoading, loadData, delTrans } = useTransaction(
    user?.id
  );
  console.log(summary)
  useEffect(() => {
    loadData();
  }, [loadData]);
  if (isLoading) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* HEADER LEFT */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>

          {/* HEADER RIGHT */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add-circle" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
            <SignOutButton/>
          </View>
        </View>
        <BalanceCard summary={summary}/>
      </View>
    </View>
  );
}
