import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";
import { db } from "./firebase.js";

export function submitPublicRequest(collectionName, form) {
    const values = new FormData(form);
    const topic = values.get("topic") || values.get("interest");
    const name = String(values.get("name") || "").trim();
    const email = String(values.get("email") || "").trim();
    const phone = String(values.get("phone") || "").trim();
    const message = String(values.get("message") || "").trim();
    const topicStr = String(topic || "").trim();

    if (name.length < 2) {
        throw new Error("يجب أن يحتوي الاسم على حرفين على الأقل.");
    }
    if (email.length < 5) {
        throw new Error("يجب إدخال بريد إلكتروني صحيح.");
    }
    if (topicStr.length < 2) {
        throw new Error("يرجى اختيار أو تحديد الموضوع.");
    }

    return addDoc(collection(db, collectionName), {
        name,
        email,
        phone,
        topic: topicStr,
        message,
        status: "new",
        createdAt: serverTimestamp()
    });
}

export function getRequestErrorMessage(error) {
    if (error?.message && !error.code) {
        return error.message;
    }
    if (error?.code === "permission-denied") {
        return "رفضت قواعد Firebase حفظ الطلب. تأكد من صحة البيانات ونشر قواعد Firestore.";
    }
    if (error?.code === "unavailable" || error?.code === "network-request-failed") {
        return "تعذر الاتصال بـ Firebase. تحقق من اتصال الإنترنت وحاول مجدداً.";
    }
    return "تعذر حفظ الطلب في Firebase. تحقق من إعداد المشروع وحاول مجدداً.";
}
