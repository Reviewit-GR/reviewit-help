/**
 * The code a shop's developer copies to call POST /v1/invitations, one snippet per language. It is the only place these
 * live: the business page (/my-business/manage/, «Σύνδεση καταστήματος») shows them, and the help-center pages should copy
 * from here, so the two never say different things. The data is made up (example.gr); the key is a placeholder.
 */
export type SnippetLang = 'curl' | 'php' | 'node' | 'python' | 'java' | 'go';

export const SNIPPET_LANGS: { id: SnippetLang; label: string }[] = [
  { id: 'curl', label: 'cURL' },
  { id: 'php', label: 'PHP' },
  { id: 'node', label: 'Node.js' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'go', label: 'Go' },
];

export const KEY_PLACEHOLDER = 'ΤΟ_ΚΛΕΙΔΙ_ΣΑΣ';
const DEFAULT_API = 'https://api.reviewit.gr';

/** The snippet for a language, calling `api` with `key` in the Authorization header. */
export function invitationSnippet(lang: SnippetLang, api: string = DEFAULT_API, key: string = KEY_PLACEHOLDER): string {
  const url = `${api.replace(/\/+$/, '')}/v1/invitations`;
  switch (lang) {
    case 'curl':
      return `curl -X POST ${url} \\
  -H "Authorization: Bearer ${key}" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"pelatis@example.gr","firstName":"Μαρία","orderRef":"1001"}'`;
    case 'php':
      return `<?php
$ch = curl_init('${url}');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ${key}',
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'email' => 'pelatis@example.gr',
        'firstName' => 'Μαρία',
        'orderRef' => '1001',
    ]),
]);
$body = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

echo $status . ' ' . $body;`;
    case 'node':
      return `// Node.js 18 or newer
(async () => {
  const res = await fetch('${url}', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ${key}',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'pelatis@example.gr',
      firstName: 'Μαρία',
      orderRef: '1001',
    }),
    signal: AbortSignal.timeout(10_000),
  });

  console.log(res.status, await res.json());
})();`;
    case 'python':
      return `import requests

res = requests.post(
    "${url}",
    headers={"Authorization": "Bearer ${key}"},
    json={
        "email": "pelatis@example.gr",
        "firstName": "Μαρία",
        "orderRef": "1001",
    },
    timeout=10,
)

print(res.status_code, res.json())`;
    case 'java':
      return `// Java 11 or newer
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class Invite {
    public static void main(String[] args) throws Exception {
        String json = "{\\"email\\":\\"pelatis@example.gr\\",\\"firstName\\":\\"Μαρία\\",\\"orderRef\\":\\"1001\\"}";

        HttpRequest request = HttpRequest.newBuilder(URI.create("${url}"))
            .timeout(Duration.ofSeconds(10))
            .header("Authorization", "Bearer ${key}")
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();

        HttpResponse<String> response = HttpClient.newHttpClient()
            .send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.statusCode() + " " + response.body());
    }
}`;
    case 'go':
      return `package main

import (
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

func main() {
	body := \`{"email":"pelatis@example.gr","firstName":"Μαρία","orderRef":"1001"}\`

	req, err := http.NewRequest("POST", "${url}", strings.NewReader(body))
	if err != nil {
		panic(err)
	}
	req.Header.Set("Authorization", "Bearer ${key}")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	res, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	out, _ := io.ReadAll(res.Body)
	fmt.Println(res.StatusCode, string(out))
}`;
  }
}
