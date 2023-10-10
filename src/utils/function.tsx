export default function truncate(str : String, maxStr: number) {
    return str.length > maxStr ? str.substring(0, maxStr) + "..." : str;
}