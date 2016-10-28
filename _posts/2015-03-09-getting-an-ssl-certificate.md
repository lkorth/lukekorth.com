---
layout: post
title: Getting an SSL Certificate
categories: [Website, Tutorial]
date: 2015-03-09
---
Two or three times a year I end up needing to update my expiring SSL certificates. Each time I have
to look up the one or two commands I need and every time it takes two or three websites to find the
right information so I've recorded it here for future reference and in the hopes that it helps
someone else as well.

Generating a new CSR:

```bash
openssl req -new -newkey rsa:2048 -nodes -keyout example_com.key -out example_com.csr
```

OpenSSL will prompt you for the details of the certificate, they can be filled out in any level of
detail you wish. The common name that is requested should match the domain the certificate will be
used for, for wildcard certs the subdomain should be a star ex: `*.example.com`.

Once the CSR has been generated it should be submitted to the certificate authority. In return they
will send your new certificate along with a copy of the intermediate and root certificates. The
intermediate and root certificates will need to be chained or concatenated to your new certificate
as follows:

```bash
cat example_com.crt intermediate_cert.crt root_cert.crt > ssl-cert.crt
```

*Note:* you may need to consult your certificate authority's documentation to find which certificate
is the intermediate and which is the root. For PositiveSSL through Comodo, purchased using
NameCheap, my concatination was:

```bash
cat example_com.crt COMODORSADomainValidationSecureServerCA.crt COMODORSAAddTrustCA.crt AddTrustExternalCARoot.crt > ssl-cert.crt
```

You can now take the concatenated SSL certificate and your private key that was created during the
CSR generation and use it with your web server of choice.
