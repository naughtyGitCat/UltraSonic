# UltraSonic Master — headless Linux container (net10.0).
# Build context = repo root (see DockerfileContext in the .csproj).
#   docker build -f src/LrWallPaper/Dockerfile -t ultrasonic-master .
# Forces the single net10.0 TFM so the Windows (net10.0-windows) target is never
# evaluated in the Linux container.

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["src/LrWallPaper/LrWallPaper.csproj", "src/LrWallPaper/"]
RUN dotnet restore "src/LrWallPaper/LrWallPaper.csproj" -p:TargetFrameworks=net10.0
COPY . .
RUN dotnet publish "src/LrWallPaper/LrWallPaper.csproj" -c Release -p:TargetFrameworks=net10.0 -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
# Magick.NET's native lib needs libgomp1 for HEIC/RAW → JPEG conversion.
RUN apt-get update \
    && apt-get install -y --no-install-recommends libgomp1 \
    && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:5281
EXPOSE 5281
# ultrasonic.db + appsettings.json live next to the dll; mount a volume for persistence.
ENTRYPOINT ["dotnet", "LrWallPaper.dll"]
