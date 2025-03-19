import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export async function registerForPushNotificationsAsync() {
  // alert('Pantau status reservasi kunjungan kamu dengan menerima layanan notifikasi dari kami');
  console.log("📢 Memeriksa apakah perangkat fisik...");
  if (!Device.isDevice) {
    alert("Push notifications require a physical device!");
    return;
  }

  console.log("📢 Meminta izin notifikasi...");
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    // alert("anda telah menolak ijin notifikasi, silahkan hubungi admin untuk dapat mengaktifkan kembali fitur ini");
    // alert("Izin notifikasi tidak diberikan!");
    return;
  }

  console.log("📢 Mengambil Push Token dari FCM...");
  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("🎉 Token berhasil didapatkan:", token);
    return token;
  } catch (error) {
    console.error("❌ Gagal mendapatkan token:", error);
    return;
  }
}
