import { firestore, rtdb } from "./firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

// ---------- Projects (Firestore) ----------
export async function createProject(userId: string, name: string, color: string) {
  const ref = await firestore.collection("users").doc(userId).collection("projects").add({
    name, color, createdAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export async function listProjects(userId: string) {
  const snap = await firestore.collection("users").doc(userId).collection("projects")
    .orderBy("createdAt", "desc").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function deleteProject(userId: string, projectId: string) {
  await firestore.collection("users").doc(userId).collection("projects").doc(projectId).delete();
}

// ---------- Conversations (Firestore) ----------
export async function createConversation(userId: string, title: string, projectId: string | null) {
  const ref = await firestore.collection("users").doc(userId).collection("conversations").add({
    title, projectId: projectId || null,
    createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export async function listConversations(userId: string) {
  const snap = await firestore.collection("users").doc(userId).collection("conversations")
    .orderBy("updatedAt", "desc").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function deleteConversation(userId: string, conversationId: string) {
  const convRef = firestore.collection("users").doc(userId).collection("conversations").doc(conversationId);
  const messagesSnap = await convRef.collection("messages").get();
  const batch = firestore.batch();
  messagesSnap.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(convRef);
  await batch.commit();
}

// ---------- Messages (Firestore subcollection) ----------
export async function addMessage(userId: string, conversationId: string, role: "user" | "assistant", text: string) {
  const convRef = firestore.collection("users").doc(userId).collection("conversations").doc(conversationId);
  await convRef.collection("messages").add({ role, text, createdAt: FieldValue.serverTimestamp() });
  await convRef.update({ updatedAt: FieldValue.serverTimestamp() });
}

export async function listMessages(userId: string, conversationId: string) {
  const snap = await firestore.collection("users").doc(userId).collection("conversations")
    .doc(conversationId).collection("messages").orderBy("createdAt", "asc").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ---------- Memory (Realtime Database — fast key/value) ----------
export async function setMemory(userId: string, key: string, value: string) {
  await rtdb.ref(`memory/${userId}/${key}`).set({ value, updatedAt: Date.now() });
}

export async function listMemory(userId: string) {
  const snap = await rtdb.ref(`memory/${userId}`).get();
  if (!snap.exists()) return [];
  const data = snap.val() as Record<string, { value: string; updatedAt: number }>;
  return Object.entries(data).map(([key, v]) => ({ key, value: v.value, updatedAt: v.updatedAt }));
}

export async function deleteMemory(userId: string, key: string) {
  await rtdb.ref(`memory/${userId}/${key}`).remove();
}
